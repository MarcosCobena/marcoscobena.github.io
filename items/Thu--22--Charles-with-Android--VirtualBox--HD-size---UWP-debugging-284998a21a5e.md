*(This post was imported, please [contact](#/contact) me if there's anything wrong with it. Thanks in advance)*

### Thu, 22: Charles with Android, VirtualBox’ HD size & UWP debugging

As part of changing endpoints at eShopOnContainers solution I wanted to double check every request was being received correctly, so came back to Charles Proxy.

I rely on official Android emus so found out a [nice article](https://dzone.com/articles/charles-proxy-in-android-emulator) to configure everything so Charles can detect the communication happening within the emu.

The bad thing’s I was getting ERR_INCOMPLETE_CHUNKED_ENCODING errors inside the emu so had to manually hook every HTTP response in the old less-fashioned way: breakpoints. (Any hint on that error and how to sort it out would be really appreaciated.)

Once everything was done —in macOS with VS for Mac— I switched to Windows, so can test UWP too. I’m having a really good experience with VirtualBox this time by the way—am thinking of publishing some notes with tips & tricks.

My previous VS 2017 installation lacked Xamarin stuff, but couldn’t go for it because was about to run out of space. Making your HD bigger in VirtualBox’ a little bit hand-made, but nothing too complicated:


  1. Detach your HD image —make sure you stopped the VM in the formal way: Start, Shut down
  2. Run in a terminal (102400 are MB, so make your own calcs): _VBoxManage modifymedium “Windows 10.vdi” — resize 102400_
  3. Attach the HD back again, run it, and open Computer Management
  4. Within HDs, just expand your current partition to fulfill the rest of available spaceI learnt all of this from [this article](https://www.jesusamieiro.com/how-to-resize-a-virtual-machines-disk-in-virtualbox/) and [this video](https://www.youtube.com/watch?v=7Aqx-VHv2_k); however, it was something like a mix of both which took me to succeed.

Finally, trying to debug PCL code with the UWP app, none of my breakpoints were hitting, but my friend Sergio immediately pointed me to the cause: look at that Debugging information piece (set as Full):

  
![](https://cdn-images-1.medium.com/max/1000/1*9paf348GHCuucXvSRcLEfQ.png)