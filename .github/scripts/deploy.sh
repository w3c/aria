#!/bin/bash

if [ $FOLDER = "" ]
then
 echo "build-output needs a build directory name in FOLDER env variable"
 exit 1
fi

TMPDIR=$FOLDER


echo Cleaning $TMPDIR before building

rm -rf ${TMPDIR}
mkdir ${TMPDIR}

# Place your build operations below

echo Now building the output in the director ./$TMPDIR

cp -R common img validator-tests ${TMPDIR}
curl https://labs.w3.org/spec-generator/?type=respec"&"url=https://raw.githack.com/w3c/aria/main/index.html -o ${TMPDIR}/index.html -f  --retry 3
