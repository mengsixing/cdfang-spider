cd ./__tests__/unit
check_file=`ls  | grep ".test.ts" |  tr -s "\n"  " "`
jest --findRelatedTests $check_file
