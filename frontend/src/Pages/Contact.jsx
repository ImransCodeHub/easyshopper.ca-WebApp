import React, { useState, useEffect } from "react";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/35036a30-f1cd-11ee-b428-632ee80a2804"; 

const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  const submitted = false;
  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Form response was not ok');
        }

        console.log(submitted);
        submitted = true;
      })
      .catch((err) => {
        // Submit the form manually
        e.target.submit();
      });
      console.log(submitted);
      // if (submitted == true) {
      //   return (
      //     <>
      //       console.log("hehehe");
      //       <div className="text-2xl">Thank you!</div>
      //       <div className="text-md">We'll be in touch soon.</div>
      //     </>
      //   );
      // }
  };


  return (
<div className="flex justify-center">
<form className="pt-36 w-full max-w-lg"
action={FORM_ENDPOINT}
onSubmit={handleSubmit}
method="POST"
>
  
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
        Name
      </label>
      <input
        type="text"
        placeholder="Your name"
        name="name"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id="grid-name"
        required
      />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-email"
        required
      />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-message">
        Message
      </label>
      <textarea
        placeholder="Your message"
        name="message"
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-message"
        required
      ></textarea>
      <p className="text-gray-600 text-xs italic">Tell us whats on your mind</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <button
        className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
        type="submit"
      >
        Send Message
      </button>
    </div>
  </div>
</form>
</div>

    
  );
};



export default Contact;

// <form class="pt-32 w-full max-w-lg">
//   <div class="flex flex-wrap -mx-3 mb-6">
//     <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
//         Name
//       </label>
//       <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
//       <p class="text-red-500 text-xs italic">Please fill out this field.</p>
//     </div>
//     <div class="w-full md:w-1/2 px-3">
//       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
//       Email
//       </label>
//       <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
//     </div>
//   </div>
//   <div class="flex flex-wrap -mx-3 mb-6">
//     <div class="w-full px-3">
//       <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
//         Message 
//       </label>
//       <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************">
//       <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
//     </div>
//   </div>
// </form>

{/* <div className="pt-32"> 
<form
  action={FORM_ENDPOINT}
  onSubmit={handleSubmit}
  method="POST"
>
  <div className="pt-0 mb-3">
    <input
      type="text"
      placeholder="Your name"
      name="name"
      className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
      required
    />
  </div>
  <div className="pt-0 mb-3">
    <input
      type="email"
      placeholder="Email"
      name="email"
      className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
      required
    />
  </div>
  <div className="pt-0 mb-3">
    <textarea
      placeholder="Your message"
      name="message"
      className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
      required
    />
  </div>
  <div className="pt-0 mb-3">
    <button
      className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
      type="submit"
    >
      Send a message
    </button>
  </div>
</form>
</div> */}