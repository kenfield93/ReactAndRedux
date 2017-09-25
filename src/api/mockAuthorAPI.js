import delay from './delay';
const authors = [
    {
        id: '1',
        firstName: 'Billy',
        lastName: 'BoB'
    },
    {
        id: '2',
        firstName: 'Gannis',
        lastName: 'Antetakumbo'
    },
    {
        id: '3',
        firstName: 'Dan',
        lastName: 'Hartman'
    }
];
let idNum = authors.length;

class AuthorAPI {
    static getAllAuthors(){
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
             resolve(Object.assign([], authors));
                }, delay
            );
        });
    }


    static addAuthor(ath){
        const author = Object.assign({}, ath);
        return new Promise((resolve, reject) =>{
             setTimeout(() => {
                 if (!author.firstName || !author.lastName)
                     reject("Author must have firstName and lastName attribute ");
                 if (author.firstName.length < 2 || author.firstName.length > 30)
                     reject("Author's first name must be more than 1 character and no more than 30");
                 if (author.lastName.length < 3 || author.lastName.length > 30)
                     reject("Author's last name must be more than 1 character and no more than 30");
                 // if( author names have numbers in it)

                 if (-1 === (authors.findIndex(a => a.firstName == author.firstName && a.lastName == author.lastName)))
                     reject("Author with that name already exists");

                 author.id = ++idNum;
                 authors.push(author);
                 resolve(author);
             }, delay);
        });
    }

    static deleteAuthor(ath){
        const author = Object.assign({}, ath);
        return new Promise( (resolve, reject) => {
            setTimeout( () => {
                const authIndex = authors.findIndex(a => a.firstName == author.firstName && a.lastName == author.lastName);
                if (authIndex == -1)
                    reject("Author to delete, doesn't exist");
                authors.splice(authIndex, 1);
                resolve(author);
            }, delay);
        });
    }
}

export default AuthorAPI;