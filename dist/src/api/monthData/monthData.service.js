var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ObjectId } from 'mongodb';
import { dbService } from '../../services/db.service.js';
import { logger } from '../../services/logger.service.js';
import { makeId } from '../../services/util.service.js';
export const monthDataService = {
    getByMonth,
    addYearData,
    // query,
    // getById,
    // getByUsername,
    // remove,
    // update,
    // add,
};
function getByMonth({ user, year, month }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getByMonth:', year, month, user._id);
            const collection = yield _getYearDataCollection();
            console.log(user);
            const [{ monthData } = { monthData: null }] = yield collection
                // .find()
                .aggregate([
                {
                    $match: {
                        year,
                        userId: new ObjectId(user._id),
                    },
                },
                {
                    $unwind: '$months',
                },
                {
                    $match: {
                        'months.month': month,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        monthData: '$months',
                    },
                },
            ])
                .toArray();
            // if (!monthData) {
            //   console.log('No monthData found, creating new monthData')
            //   const demoData = _getDemoData()
            //   await collection.insertMany(demoData as YearData[])
            // }
            console.log('monthData:', monthData);
            return monthData;
        }
        catch (err) {
            logger.error('Failed to get monthData with data:', year, month, 'with err:', err);
            throw err;
        }
    });
}
function addYearData(userId, year) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const yearData = _getEmptyYearData(userId, year);
            yearData.months.push(_getEmptyMonthData());
            yield dbService.addToCollection('yearData', yearData);
            console.log('yearData:', yearData);
            return yearData;
        }
        catch (err) {
            logger.error('Failed to add yearData with data:', year, 'with err:', err);
            throw err;
        }
    });
}
function _getEmptyYearData(userId, year = new Date().getFullYear()) {
    return {
        year,
        userId,
        months: [],
    };
}
function _getEmptyMonthData(month = new Date().getMonth()) {
    return {
        id: makeId(),
        month,
        budget: 0,
        expneses: {
            recurring: [],
            nonRecurring: [],
        },
    };
}
function _getDemoData() {
    return [
        {
            userId: new ObjectId('63fa32804e5ce2b8baa62274'),
            year: 2023,
            months: [
                {
                    id: '1',
                    month: 1,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '2',
                    month: 2,
                    budget: 10100,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 5000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '3',
                    month: 3,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '4',
                    month: 4,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
            ],
        },
        {
            userId: new ObjectId('63fa32804e5ce2b8baa62274'),
            year: 2022,
            months: [
                {
                    id: '1',
                    month: 1,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '2',
                    month: 2,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '3',
                    month: 3,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '4',
                    month: 4,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
            ],
        },
        {
            userId: new ObjectId(1),
            year: 2021,
            months: [
                {
                    id: '1',
                    month: 1,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '2',
                    month: 2,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '3',
                    month: 3,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
                {
                    id: '4',
                    month: 4,
                    budget: 1000,
                    expneses: {
                        recurring: [
                            {
                                id: '1',
                                name: 'Rent',
                                price: 1000,
                            },
                        ],
                        nonRecurring: [],
                    },
                },
            ],
        },
    ];
}
// async function query(filterBy = {}) {
//   //   const criteria = _buildCriteria(filterBy)
//   try {
//     const collection = await _getUserCollection()
//     var users = await collection.find().toArray()
//     return users.map(user => {
//       return getCleanUser(user)
//     })
//   } catch (err) {
//     logger.error('cannot find users', err)
//     throw err
//   }
// }
// async function getById(userId: string) {
//   try {
//     const collection = await _getUserCollection()
//     const user = await collection.findOne({ _id: new ObjectId(userId) })
//     if (!user) return null
//     return getCleanUser(user)
//   } catch (err) {
//     logger.error(`while finding user by id: ${userId}`, err)
//     throw err
//   }
// }
// async function getByUsername(username: string) {
//   try {
//     const collection = await _getUserCollection()
//     const user = await collection.findOne({ username })
//     return user
//   } catch (err) {
//     logger.error(`while finding user by username: ${username}`, err)
//     throw err
//   }
// }
// async function remove(userId: string) {
//   try {
//     const collection = await _getUserCollection()
//     await collection.deleteOne({ _id: new ObjectId(userId) })
//   } catch (err) {
//     logger.error(`cannot remove user ${userId}`, err)
//     throw err
//   }
// }
// async function update(user: User) {
//   try {
//     // peek only updatable properties
//     const userToSave = {
//       ...user,
//       _id: new ObjectId(user._id), // needed for the returnd obj
//     }
//     const collection = await _getUserCollection()
//     await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
//     return userToSave
//   } catch (err) {
//     logger.error(`cannot update user ${user._id}`, err)
//     throw err
//   }
// }
// async function add(user: NewUser) {
//   try {
//     // peek only updatable fields!
//     const userToAdd = {
//       username: user.username,
//       password: user.password,
//     }
//     const collection = await _getUserCollection()
//     await collection.insertOne(userToAdd as User)
//     return userToAdd
//   } catch (err) {
//     logger.error('cannot add user', err)
//     throw err
//   }
// }
// function getCleanUser(user: User) {
//   const { password, ...userWithoutPassword } = user
//   return userWithoutPassword
// }
function _getYearDataCollection() {
    return dbService.getCollection('yearData');
}
