var expect = require('../index')

describe('Expectations', function () {
    describe('#toExists()', function () {
        it('should throw error if value doesnt exist', function () {
            expect({}).toExists();
            expect(undefined).toNotExists()
        });
    });

    describe('#toBeA()', function () {
        it('should throw error if value isnt of expected type', function () {
            
            let User = function () {
                this.name = "User"
            }

            let user1=new User()

            expect(user1).toBeA(User);
            expect(undefined).toNotBeA('string')
        });
    });
    describe('#toBe()', function () {
        it('should throw error if value isnt equal', function () {
            let value = 10
            expect(value).toBe(10);
            expect("some value").toNotBe('some not value')
        });
    });

    describe('#toExactlyBe()', function () {
        it('should throw error if value and type is unequal', function () {
            let value = 10
            expect(value).toExactlyBe(10);
            expect("some value").toExactlyBe('some value')
        });
    });
    
});