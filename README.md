# Client Storage Web App

## Assumptions and Implementation - Ido Lev
### Assumptions:
● Full Name: Full name consists of at least two groups of Unicode letters separated by a
space.

● ID: Teudat Zehut: ID is validated according to Israeli ID validation guidelines.

● Phone Number: The phone number is assumed to be a sequence of digits and may start
with '+'.

● IP Address: The IP address is validated as per the IP standards.

● Email: The email address is validated as per standard email format.
*All these fields (except of IP Address) are set to 'NOT NULL' in the database.

### General Implementation:
● DB fetching is optimised by pulling only 10 clients per page to keep the application scalable
for larger datasets.

● The ID field is set as the primary key in the database, ensuring there are no duplicate entries.
Some of the initial data attached to this assignment contained duplicate IDs which were
excluded during the import function call.

● Due to IP-API limitation of 45 requests per minute for free accounts, not all locations were
updated when the large dataset is imported. Alternatives have been checked but they had
similar limitations .

● Some of the provided IP addresses in the attached data were invalid or unrecognised by the
IP location API and therefore were ignored.

● Despite the API request limitations, search by city or country is still functional for clients
whose geo-data was successfully fetched. The search option is available in the search bar.

● I noticed that the data attached include an email field which wasn't mentioned in the
assignment as part of the client attributes. Since having extra information doesn't harm, and
can be beneficial in certain cases, I decided to include it in the project.

● The website is fully responsive.

### Project Code Implementation:
● The stack is React, Node.js, and MySQL written in TypeScript.

● The upload directory is essential for temporarily storing the CSV file before it gets uploaded to
the database.

● User account details like database username and password are not included in the submitted
source code for security reasons. You would need to supply your own database connection

details in the following format in the .env file:

DB_HOST=localhost

DB_USER=your_username

DB_PASS=your_password

