readonly item_name="todo"
readonly item_title="TODO"
readonly item_path="items/$item_name.md"
readonly today=`date +"%d/%m/%Y"`

pushd ../
echo "## $item_title\n\n$item_title" >> $item_path
echo "addPost(\"$item_name\", \"$item_name\", \"$today\");" >> items/items.js
open $item_path
popd