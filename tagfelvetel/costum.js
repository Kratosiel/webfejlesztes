$("#urlap").validate({
    rules:{
        veznev: {
            minlength: 2,
        }
    },
    messages: {
        required: "Kötelező mező!",
        minlength: "Legalább legyen 2 karakter",
    },


    submitHandler: function(form) {
      form.submit();
    }
   });