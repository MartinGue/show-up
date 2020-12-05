const Showup = artifacts.require('./Showup.sol')

 require ('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Showup', ([account, author, tipper]) => {
  const [ owner, newOwner ] = account;
  let showup

  before(async () => {
    showup = await Showup.deployed() 
  })  

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await showup.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await showup.name()
      assert.equal(name, 'Showup')
    })
  }) 

  it("should check restriction", async () => {
    try {
      let result = await onlyOwner.call({from: author})
      assert.equal(result.toString(), owner)
    } catch (e) {
      console.log(`${author} is not the owner`)
    }
  })

 describe('images', async () => {
  let result, imageCount
  const hash = 'abc123'

  before(async () => {
    result = await showup.uploadImage(hash, 'Image description', { from: author })
    imageCount = await showup.imageCount()
  })


    it('creates images', async () => {  
      //SUCCESS   
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Image description', 'description is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      //FAILURE: Image must have hash
      await showup.uploadImage('', 'Image Description', { from: author }).should.be.rejected;

      await showup.uploadImage('Image hash', '', { from: author }).should.be.rejected;
    })
    it('lists images', async () => {
      const image = await showup.images(imageCount)
      assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(image.hash, hash, 'Hash is correct')
      assert.equal(image.description, 'Image description', 'description is correct')
      assert.equal(image.tipAmount, '0', 'tip amount is correct')
      assert.equal(image.author, author, 'author is correct')
    })
    it('allows users to tip images', async () => {
      //Track the author balance before purchase
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await showup.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether')})

      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Image description', 'description is correct')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      //Check that the author has received funds

      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      let tipImageOwner
      tipImageOwner = web3.utils.toWei('1', 'Ether')
      tipImageOwner = new web3.utils.BN(tipImageOwner)

      const expectedBalance = oldAuthorBalance.add(tipImageOwner)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      await showup.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })
   })
  })