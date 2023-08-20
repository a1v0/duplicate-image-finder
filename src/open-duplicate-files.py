import os

# this approach seems to be fraught with problems
# needs a rethink
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#


ICLOUD_PATH = "C:\\Users\\mensu\\Desktop\\test-image-folder"  # for DEV
# ICLOUD_PATH="/mnt/c/Users/mensu/Pictures/iCloud Photos/Photos" # for PROD

csv = open("./src/duplicate-files.csv")
contents = csv.read()
contents_rows = contents.split("\n")
for i in range(1, len(contents_rows)):
    files = contents_rows[i].split(",")
    print("Now processing row " + str(i))
    for file in files:
        print("cmd.exe C/ start " + "'" + ICLOUD_PATH + "\\" + file + "'")
        os.system("cmd.exe C/ start " + "'" + ICLOUD_PATH + "\\" + file + "'")


# os.system("explorer.exe .")
