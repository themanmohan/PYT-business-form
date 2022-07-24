import modal from "./resources/modal";

document.onload = function () {
    console.log(`working`)


    modal.show(null, [`email-verification-form-wrapper`], `

    <div class="email-verification-form-section">

        <h3>Your Enter Your Email</h3>

        <form>
            <div class="form-group">
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="example11@gmail.com">
            <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      
    </div>`
    );
}();