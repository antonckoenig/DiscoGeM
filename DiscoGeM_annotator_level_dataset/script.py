import csv

# Open the CSV file
with open('filtered-dataset.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)

    # initialize an empty list
    unique_values = []
    # Iterate over the rows in the CSV
    for row in reader:
        # Get the first column
        value = row[0]
        # Remove everything before the last semicolon
        value = value.split(";")[-1]
        # add the modified value to the list if it's unique
        if value not in unique_values:
            unique_values.append(value)
    # print the list of unique values
    print(unique_values)
