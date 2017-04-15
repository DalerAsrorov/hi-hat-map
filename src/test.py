a = None 
while True: 
	try:
             a = int(input("Please select the type of release required: "))
        except Exception as err:
             print("Error", err)

