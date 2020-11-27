const Session = require("../../models/Session");
const User = require("../../models/User");

module.exports = app => {
  app.post("/api/account/signin", (req, res, next) => {
    // get the login information from the body of the request
    const { body } = req;
    console.log(body);
    let { email, password } = body;

    // response if the email or password is empty
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Please fill in the email bebe"
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error: Please fill in the password"
      });
    }
    // if both is inputted we compare the info with database

    email = email.toLowerCase();

    // Look for a match in the email
    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err)
          return res.send({
            success: false,
            message: "Error: Server Error"
          });
        if (users.length != 1)
          return res.send({
            success: false,
            message: "Error: Invalid Credentials"
          });
        // if no errors and email is matched, check if the password is valid
        // assign user to the first match (should be only 1 match)
        const user = users[0];
        // see is the password matches
        if (!user.validPassword(password))
          return res.send({
            success: false,
            message: "Error: Invalid Credentials"
          });

        Session.find(
          {
            userId: user._id
          },
          (err, session) => {
            if (session.length > 0) {
              return res.send({
                success: true,
                message: "Already Logged in!",
                token: session[0]._id
              });
            }
            const userSession = new Session();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
              if (err)
                return res.send({
                  success: false,
                  message: "Error: Server error"
                });
              return res.send({
                success: true,
                message: "Welcome King Bebe!",
                token: doc._id
              });
            });
          }
        );
      }
    );
  });

  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;

    let { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return res.send({
        success: false,
        message: "Error: Something is missing"
      });
    }
    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, prevUser) => {
        if (err)
          return res.send({ success: false, message: "Error: Server error" });
        else if (prevUser.length > 0)
          return res.send({
            success: false,
            message: "Error: Account already exists"
          });

        const newUser = new User();

        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);

        newUser.save((err, user) => {
          if (err)
            return res.send({ success: false, message: "Error: Server error" });
          return res.send({
            success: true,
            message: "Welcome to the bebe Club"
          });
        });
      }
    );
  });

  app.get("/api/account/logout", (req, res, next) => {
    const { query } = req;

    let { token } = query;
    if (token) {
      Session.deleteOne(
        {
          _id: token,
          isDeleted: false
        },
        {},
        err => {
          if (err)
            return res.send({
              success: false,
              message: "Error: " + err.reason
            });

          return res.send({
            success: true,
            message: "Logged out"
          });
        }
      );
    } else {
      res.send({
        success: false,
        message: "Error: No Token"
      });
    }
  });

  app.get("/api/account/verify", (req, res, next) => {
    const { query } = req;
    let { token } = query;

    Session.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, session) => {
        if (token.length != 24)
          res.send({ success: false, message: "Error: Wrong Token" });
        if (err)
          return res.send({
            success: false,
            message: "Error: Server Error" + err
          });
        if (session.length != 1)
          return res.send({ success: false, message: "Error: " + err });

        return res.send({
          success: true,
          message: "Verfied"
        });
      }
    );
  });
};
