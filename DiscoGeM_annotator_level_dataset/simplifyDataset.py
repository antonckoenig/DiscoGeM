import csv

# Define the terms and corresponding labels
terms = {
    "arg2-as-instance": "N",
    "arg2-as-detail": "N",
    "result": "N",
    "conjunction": "N",
    "reason": "N",
    "precedence": "N",
    "arg2-as-denier": "D",
    "arg1-as-detail": "N",
    "contrast": "D",
    "arg2-as-subst": "N",
    "synchronous": "N",
    "differentcon": "D",
    "arg1-as-denier": "D",
    "similarity": "A",
    "succession": "N",
    "disjunction": "N",
    "norel": "N"
}

# Open the CSV file
with open('filtered-dataset.csv', newline='', mode='r') as csvfile:
    reader = csv.reader(csvfile)
    data = list(reader)

# Replace the values in the first column with corresponding labels
    for i in range(1, len(data)):
        data[i][0] = terms.get(data[i][0], "N")

# Write the modified data to a new file
with open('modified-dataset.csv', newline='', mode='w') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)

print("Data modification complete. The new dataset is named 'modified-dataset.csv'")
