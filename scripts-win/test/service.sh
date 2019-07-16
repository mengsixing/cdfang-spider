@ECHO OFF
cd ./__tests__/service
check_file=`ls  | grep ".spec.ts" |  tr -s "\n"  " "`
jest --detectOpenHandles --findRelatedTests $check_file
