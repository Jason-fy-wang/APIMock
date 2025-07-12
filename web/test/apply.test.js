
/*
why use apply? 
1. spread an array into a function that expects separate parameter
2. Borrow methods from one object to another
3. dynamiclly control what this should refer to

syntax:
fn.apply(thisArg, argsArray)
thisArg: is what this will be inside fn
argsArray: is an actual array (or array like object) whose items become the individual arguments

*/
describe("apply test", () => {

    it("spread array into function", () => {
        const valeus = [5,6,2,8,3]
        const max = Math.max.apply(null, valeus)
        expect(max).toBe(8)

        const min = Math.min.apply(null, valeus)
        expect(min).toBe(2)
    })

    it ("borrow methos from one object to another", ()=> {
        const arrayLike = {0: "a", 1: "b", 2: "c", length: 3};

        const slice = Array.prototype.slice
        const realArray = slice.apply(arrayLike, [0])
        expect(realArray).toEqual(['a','b','c'])
        expect(realArray.length).toBe(3)
    })

    it("dynamic control this", () => {
        const person = {
            name: "Alice",
            greet: function(greeting, punc) {
                return greeting + ' ' + this.name + punc
            }
        }
        const greet = person.greet("Hi", "!!")
        expect(greet).toEqual("Hi Alice!!")

        const other = {name: "Bob"}
        const greet1 = person.greet.apply(other, ["Hello", "!"])
        expect(greet1).toEqual("Hello Bob!")

    })

})

