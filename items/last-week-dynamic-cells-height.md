I’m currently working on an iOS app which has an UICollectionView with different
cells, and one of those has inside an UIWebView. Such, renders HTML returned
from an API and, by design specs., the container cell must grow to accommodate
the final web page loaded (similar to what Medium's app does when you tap on an
article).

My question was: how can I achieve such dynamic growth? By one side, is how we
gather the final HTML document’s height, where this simple JavaScript snippet
returns exactly that:

```c#
var actualHeight = WebView.EvaluateJavascript("document.body.scrollHeight");
```

(You’ll need to execute it just before the DOM is loaded, where
UIWebView.LoadFinished is pretty handy.)

By the other one, how do I tell back the UICollectionView that specific cells
need more vertical space? Looking through Google I found out a few articles and
StackOverflow questions which touch this and, don’t know where, found what I
finally implemented: the atrezzo cell technique (the “atrezzo” thing is mine).

 

![](https://c1.staticflickr.com/4/3328/3413473433_fe6c742ece.jpg)

[Títeres](https://www.flickr.com/photos/bercastell/3413473433/in/photolist-6cCWJe-a6KDLu-oQeMLJ-pLRxrx-a6GPRV-a6GJ4B-a6KyE5-a6Kx2N-pM6bEi-4srKjd-qX4maB-7N69yK-pJZRR9-a6GLNT-a6GMrT-a6GDHn-a6KEiJ-x65cH-5nsuJ8-a6KF1w-6YYXJ9-a6Kzdj-5nsvJT-4uwnHr-5nwH83-pMasKU-5nx2wm-a6GFWk-5nssQg-5nstJV-pJZP7w-pMatRw-6YZ3Sd-2fB5hD-6YZ9cL-jZiRmk-6o5SdR-6oa49Q-6YZ6sh-6YYEBb-qYcshv-6YYBAJ-f4ixo9-nAV2ye-3HpRKD-nzaa1s-9bpzgX-994Qgp-9oYF6C-2BqLf6)

 

The idea is as follows: why don’t we create an atrezzo cell -one which never
gets actually added to the collection view- just for computing its size
depending on its content? That way, asynchronously we’ll get the final height
(through above JavaScript) and ask the collection view to reload just that item.
Something like this -in your UICollectionViewSource:

```c#
[Export("collectionView:layout:sizeForItemAtIndexPath:")]
public virtual CGSize SizeForItemAtIndexPath(UICollectionView collectionView, 
                                             UICollectionViewLayout layout, 
                                             NSIndexPath indexPath)
{
    [...]

    if (_webViewHeight == 0)
    {
        if (_atrezzoCell == null)
        {
            _atrezzoCell = NSBundle.MainBundle.LoadNib(nameof(WebViewCell), 
                this, null)
                .GetItem<WebViewCell>(0);

            _atrezzoCell.HeightMeasured += (sender, e) =>
            {
                _webViewHeight = e.Height;

                ReloadItemAction(indexPath);
            };
        }

        var item = GetItemAt(indexPath);

        _atrezzoCell.Refresh(item);
        _atrezzoCell.SetNeedsLayout();
        _atrezzoCell.LayoutIfNeeded();

        size = _atrezzoCell.ContentView.SystemLayoutSizeFittingSize(
            UIView.UILayoutFittingCompressedSize);

        _previousItemHeight = size.Height;

        size.Width = collectionView.Frame.Width;
    }
    else
        size = new CGSize(collectionView.Frame.Width, 
            _previousItemHeight + _webViewHeight);

    [...]

    return size;
}
```

I implemented this back in December and last week had a similar task but without
involving UIWebView. Our workmate Oriol made a simple yet powerful approach
without needed those atrezzos so, finally, this time I backed on his solution. I
hope this servers as a poke to him to write how he sorted that out which, for
sure, will be useful for others as well.
