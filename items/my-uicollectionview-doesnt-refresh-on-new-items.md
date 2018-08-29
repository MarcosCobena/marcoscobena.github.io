*(This post was imported, please [contact](/?i=contact) me if there's anything wrong with it. Thanks in advance)*

Last week I was struggling with an UICollectionView -MvxCollectionView actually- which was not reacting to new items coming in the DataSource. For more turns I took, I didn't found the answer.

I double checked the property I was binding in my ViewModel was an ObservableCollection&lt;T&gt;, also that modifying its content was firing anything in the DataSource but, in this last, it was just returning 0 sections for the very first time, which was correct by that one, and that was all.

Between disassembling MvvmCross' MvxCollectionViewSource and looking through the source code at GitHub I noticed every time its ItemsSource prop. was set a new call to UICollectionView.ReloadData() was done as well.

So, if new items arrive into the DataSource, and this reacts "refreshing" the collection, why I keep seing it empty? I don't remember currently if I found this at StackOverflow -Gosh bless it- or in iOS official API, but in iOS 10 ReloadData() <strong>must</strong> be done from the UI thread, otherwise it can't assure the refresh to happen. From Xamarin perspective, something like:
<pre>UIApplication.SharedApplication.InvokeOnMainThread(() =&gt; ReloadData());</pre>
And, magic, there were the items I was looking for :-)