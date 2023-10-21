// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const { createUser, getAllUsers, getUsersDetail, createAccounts, getAllAccounts, getDetailAccounts } = require('../../libs/users.libs.js')
// user = {}


// describe('User and Account Management', () => {
      
//     test('Test create a new user', async () => {
//         try {
//             let name = 'Niko';
//             let email = '1nifa5ds44iw@gmail.com';
//             let password = '123456';
//             let identityType = 'KTP';
//             let identityNumber = '1156dfs4539w03789';
//             let address = 'Jakarta';
//             let result = await createUser(name, email, password, identityType, identityNumber, address);
//             user = result;            
//             expect(result).toHaveProperty('id');
//             expect(result).toHaveProperty('name');
//             expect(result).toHaveProperty('email');
//             expect(result).toHaveProperty('password');
//             expect(result.name).toBe(name);
//             expect(result.email).toBe(email);
//             expect(result.password).toBe(password);
//         } catch (err) {
//             throw err;
//         }
//     })
//     test('Test email already exist', async () => {
//         try {
//             let name = 'Niko';
//             let email = '1nifa5ds44iw@gmail.com';
//             let password = '123456';
//             let identityType = 'KTP';
//             let identityNumber = '1156dfs4539w03789';
//             let address = 'Jakarta';
//             let result = await createUser(name, email, password, identityType, identityNumber, address);
//             expect(result).toBe('error')
//         } catch (err) {
//             expect(err).toBe('Email sudah terdaftar');
//         }
//     })
//     test('Test get all users', async () => {
//         try {
//             let users = await getAllUsers();
//             expect(users).toBeInstanceOf(Array);
//         } catch (err) {
//             throw err;
//         }
//     });

//     test('Test get user details by ID', async () => {
//         try {
//             if (user.id) {
//                 let userDetails = await getUsersDetail(user.id);
//                 expect(userDetails).toHaveProperty('id');
//                 expect(userDetails.id).toBe(user.id);
//             }
//         } catch (err) {
//             throw err;
//         }
//     });

//     test('Test create a new bank account', async () => {
//         try {
//             let balance = 1000;
//             let bankName = 'Bank XYZ';
//             let bankAccountNumber = '98765432';
//             let userId = user.id;

//             let account = await createAccounts(balance, bankName, bankAccountNumber, userId);
//             expect(account).toHaveProperty('id');
//         } catch (err) {
//             throw err;
//         }
//     });

//     test('Test get all bank accounts', async () => {
//         try {
//             let accounts = await getAllAccounts();
//             expect(accounts).toBeInstanceOf(Array);
//         } catch (err) {
//             throw err;
//         }
//     });

//     test('Test get bank account details by ID', async () => {
//         try {
//             let accounts = await getAllAccounts();
//             if (accounts.length > 0) {
//                 let accountDetails = await getDetailAccounts(accounts[0].id);
//                 expect(accountDetails).toHaveProperty('id');
//                 expect(accountDetails.id).toBe(accounts[0].id);
//             }
//         } catch (err) {
//             throw err;
//         }
//     });

// });
