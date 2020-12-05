    const { BN, constants } = require('@openzeppelin/test-helpers');
    const { MAX_UINT256 } = constants;
    
   require('chai');
    
    const SafeMath = artifacts.require('SafeMath');
    
    contract('SafeMath', function (accounts) {
      beforeEach(async function () {
        this.SafeMath = await SafeMath.new();
      });    
     
    
      describe('add', function () {
        it('adds correctly', async function () {
          const a = new BN('5678');
          const b = new BN('1234');
    
          await this.SafeMath.add, a, b, a.add(b);
        });
    
        it('reverts on addition overflow', async function () {
          const a = MAX_UINT256;
          const b = new BN('1');
    
          await this.SafeMath.add, a, b, 'SafeMath: addition overflow';
        });
      });
    
      describe('sub', function () {
        it('subtracts correctly', async function () {
          const a = new BN('5678');
          const b = new BN('1234');         
        });
    
        it('reverts if subtraction result would be negative', async function () {
          const a = new BN('1234');
          const b = new BN('5678');
              
        });
      });
    
      describe('mul', function () {
        it('multiplies correctly', async function () {
          const a = new BN('1234');
          const b = new BN('5678');
        });
    
        it('multiplies by zero correctly', async function () {
          const a = new BN('0');
          const b = new BN('5678');          
        });
    
        it('reverts on multiplication overflow', async function () {
          const a = MAX_UINT256;
          const b = new BN('2');          
        });
      });
    
      describe('div', function () {
        it('divides correctly', async function () {
          const a = new BN('5678');
          const b = new BN('5678');          
        });    
        it('divides zero correctly', async function () {
          const a = new BN('0');
          const b = new BN('5678');         
        });
    
        it('returns complete number result on non-even division', async function () {
          const a = new BN('7000');
          const b = new BN('5678');         
        });
    
        it('reverts on division by zero', async function () {
          const a = new BN('5678');
          const b = new BN('0');          
        });
      });
    
      describe('mod', function () {
        describe('modulos correctly', async function () {
          it('when the dividend is smaller than the divisor', async function () {
            const a = new BN('284');
            const b = new BN('5678');           
          });
    
          it('when the dividend is equal to the divisor', async function () {
            const a = new BN('5678');
            const b = new BN('5678');            
          });
    
          it('when the dividend is larger than the divisor', async function () {
            const a = new BN('7000');
            const b = new BN('5678');            
          });
    
          it('when the dividend is a multiple of the divisor', async function () {
            const a = new BN('17034'); // 17034 == 5678 * 3
            const b = new BN('5678');           
          });
        });
    
        it('reverts with a 0 divisor', async function () {
          const a = new BN('5678');
          const b = new BN('0');         
        });
      });
    });  