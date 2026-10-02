/* 1. The built-in function setTimeout uses callbacks. Create a promise-based alternative.
The function delay(ms) should return a promise. That promise should resolve after ms milliseconds,
so that we can add .then to it, like this: */
/* function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('runs after 3 seconds')); */


/* 2. Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch: */
/* async function loadJson(url) {
  let response = await fetch(url);

  if (response.status == 200) {
    let json = await response.json();
    return json;
  }

  throw new Error(response.status);
}

async function main() {
  try {
    let data = await loadJson(
      'https://javascript.info/no-such-user.json'
    );

    console.log(data);
  } catch (error) {
    alert(error);
  }
}

main(); */


/* 3. Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.
And get rid of the recursion in favour of a loop in demoGithubUser: with async/await that becomes easy to do. */
/* class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; 
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {

        alert("No such user, please reenter.");
      } else {

        throw err;
      }
    }
  }


  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser(); */


/* 4. We have a “regular” function called f. How can you call the async function wait() and use its result inside of f? */
/* async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  wait().then(result => alert(result));
}

f(); */


/* 5. The task is to create a generator function pseudoRandom(seed) that takes seed and creates the generator with this formula. */
/* function* pseudoRandom(seed) {
  let value = seed;
  while(true) {
    value = value * 16807 % 2147483647;
    yield value;
  }

};
let generator = pseudoRandom(1);
alert(generator.next().value); 
alert(generator.next().value); 
alert(generator.next().value); */


/* 6.Usually, an attempt to read a non-existent property returns undefined.
Create a proxy that throws an error for an attempt to read of a non-existent property instead.
That can help to detect programming mistakes early.
Write a function wrap(target) that takes an object target and return a proxy that adds this functionality aspect. */
/* let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`)
      }
    }
  });
}
user = wrap(user);
alert(user.name);
alert(user.age); */


/* 7.In other words, array[-N] is the same as array[array.length - N].
Create a proxy to implement that behavior. */
/* let array = [1, 2, 3];
array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});
alert(array[-1]); 
alert(array[-2]); */


/* 8.Create a function makeObservable(target) that “makes the object observable” by returning a proxy.
In other words, an object returned by makeObservable is just like the original one, 
but also has the method observe(handler) that sets handler function to be called on any property change.
Whenever a property changes, handler(key, value) is called with the name and value of the property.
P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way. */
/* let handlers = Symbol('handlers');
function makeObservable(target) {
  target[handlers] = [];
  target.observe = function(handler) {
    this[handlers].push(handler);
  };
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); 
      if (success) { 
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}
let user = {};
user = makeObservable(user);
user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});
user.name = "John"; */


/* 9.Create a calculator that prompts for an arithmetic expression and returns its result.
There’s no need to check the expression for correctness in this task. Just evaluate and return the result. */
/* let expr = prompt("Type an arithmetic expression?", '2*3+2');
alert( eval(expr) ); */