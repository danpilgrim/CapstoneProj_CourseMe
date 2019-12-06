# openar-courseme


## Git Local Commands

TO START:
```
$ git clone https://github.com/danpilgrim/openar-courseme.git
```

TO PULL CODE LOCALLY:
```
$ git pull
$ git reset --hard                  # overwrites current local code with last push
```

TO PUSH CODE TO REPOSITORY:
```
$ git commit -am "information about the commit"
$ git push
```

LIST BRANCHES:  
```
$ git list       
```

TO CREATE AND CHECKOUT (SWITCH TO) A BRANCH:
```
$ git checkout -b name_of_branch      
```

TO ONLY CHECKOUT (SWITCH TO) A BRANCH:
```
$ git checkout name_of_branch   
```

## Git Remote Commands

TO PUSH TO UPSTREAM ORIGIN:
```
$ git branch --set-upstream my_branch origin/my_branch
```

TO VIEW REMOTE BRANCHES:
```
$ git branch -r
```

TO PULL REMOTE BRANCH:
```
$ git checkout -t origin/haml
```

## React Commands

TO CREATE REACT SERVER:
```
$ react-native start
```

TO RUN SIMULATED IOS/ANDROID:
```
$ react-native run-ios
$ react-native run-android
```

TO RUN WITH LOGS:
```
$ react-native log-ios                  #prints all under code's console.log('text');
$ react-native log-android
```

