![](items/images/pointnet.png)

I have been working on PointNet in different stages.
The first one, back in early 2023, I added a native E57 importer based on C/C++, through a manual wrapper in C#. I also worked builds out.
The second one, in middle 2024, I created a processing pipeline so we could transform point clouds through Python. Basically, we compiled Python scripts into EXEs, and consumed such from PointNet.
The third one, in late 2024 and early 2025, I have created a plug-ins architecture so third-parties can extend PointNet, and started moving the processing pipeline to plug-ins.
Common to every stage, we have been trying to refactor the codebase into something more maintainable, leveraging unit tests everywhere we go.

|            |                                           |
| ---------- | ----------------------------------------- |
| Language   | C# (.NET), Python                         |
| Frameworks | Evergine, ImGui                           |
| Platforms  | Windows                                   |
| Date       | January 2023-March 2025                   |
| More info? | <https://cathedral.plainconcepts.com/> (outdated) |
