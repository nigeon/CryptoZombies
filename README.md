# CryptoZombies
This are the contracts updated to last lesson of the [CryptoZombies](https://cryptozombies.io) course. Built in [Truffle](http://truffleframework.com).

[CryptoZombies](https://cryptozombies.io) is a free interactive code school that teaches you to write smart contracts in Solidity through building your own crypto-collectables game.

### Install
```
npm install -g truffle
npm install
truffle compile
truffle migrate
npm run dev
```

### Notes:
If getting an error when executing "migrate" because it was already migrated:
```
Error: Attempting to run transaction which calls a contract function, but recipient address 0xb389ce45f69e5dcb49375043c02d861b0d4d396b is not a contract address
```

Execute the migration with "--reset" option:
```
truffle migrate --reset
```

### Contribute
The idea is keeping this code as close as [the course](https://cryptozombies.io), but with the help of Truffle.
It's not covered in the course (yet), but testing suite would be nice to have.

Have fun and PR please!

### More info
* Please see the [Official Truffle Documentation](http://truffleframework.com/docs/) for guides, tips, and examples.
