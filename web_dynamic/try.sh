#!/bin/bash

# Clean the parameter by removing trailing commas
cleaned_param=$(echo $1 | sed 's/,$//')
# full_path="\w+\/"
full_path="\/?\w+\/"
base_dir=$PWD
if [[ -z $1 ]];then
      echo "Invalid!" 
      echo "usage: <script file> param1 ..."
else
      for param in $@; do
            if [[ $param =~ $full_path ]]; then
                  input_string=$(echo $param | sed 's/,$//')
                  directory_part=$( dirname $input_string)
                  f_name=$(basename $input_string)
                  mkdir -p $base_dir/$directory_part
                  touch $base_dir/$directory_part/$f_name
                  chmod +x $base_dir/$directory_part/$f_name
                  echo "successfully created ${input_string}"
                  
            else
                  cleaned_param=$(echo $param | sed 's/,$//')
                  touch $base_dir/$cleaned_param
                  chmod +x $cleaned_param
                  echo "successfully created ${cleaned_param}"
            fi
      done
fi


