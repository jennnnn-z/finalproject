import { Malle } from '@deltablot/malle';

// now create the malle
const malle = new Malle({
  // this is the function that will be called once user has finished entering text (press Enter or click outside)
  // it receives the new value, the original element, the event and the input element
  fun: (value, original, event, input) => {
    console.log(`New text: ${value}`);
    console.log(`Original element:`);
    console.log(original);
    // add here your code for POSTing the new value
    // something along the line of:
    return fetch('/ajax', {
      url: url + 'favorite/post/',
      method: 'POST',
      body: JSON.stringify({ 'activity': value, 'key': original.dataset.key }),
    });
  },
}).listen(); // directly start listening after object creation