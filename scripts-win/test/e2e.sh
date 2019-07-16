@ECHO OFF
cd ./__tests__/e2e
check_file=`ls  | grep ".spec.ts" |  tr -s "\n"  " "`
jest --findRelatedTests $check_file
