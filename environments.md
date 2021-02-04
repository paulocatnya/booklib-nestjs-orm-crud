# booklib
API for manage library

# Functional requirements
[X] Register a book
[X] List all books
[X] Edit a book
[X] Delete a book
[X] You cannot add a book if it has the same Name and Author
[] Change rented book status
[] List all books by rented status

# Non-functional requirements
NESTJS
TYPEORM

# Error handling
[X] You cannot edit a book that does not exist (id)
[X] You cannot delete a book that does not exist (id)

# Book
id: integer
name: string
author: string
rented: boolean
pictureUrl: string