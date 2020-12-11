const BotList = require("../../models/BotList");
const multer = require("multer");

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb("Error: .jpeg or .png format only!", false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

module.exports = (app) => {
  app.get("/botlist/list", async (req, res, next) => {
    let results = [];
    BotList.find({}, (err, data) => {
      if (!data) res.send({ success: true, message: "no data" });
      data.forEach((e) => {
        const name = e.botName;
        const image = e.botLogo.toString("base64");
        const points = e.points;
        const _id = e._id;
        const diff = e.diff;

        results.push({ name, image, points, _id, diff });
      });

      res.send({
        success: true,
        results,
      });
    });
  });

  app.post("/botlist/add", upload.single("botLogo"), async (req, res, next) => {
    const { body } = req;
    const { file } = req;

    let { botName } = body;

    if (!body || !file) {
      res.send({
        success: false,
        message: "Error: Please include bot name and a logo",
      });
    } else {
      let botLogo = file.buffer;

      const bot = new BotList({
        botLogo,
        botName,
        points: 0,
        diff: 0,
      });

      botName.toLowerCase();

      await bot.save((err, saved) => {
        if (err) {
          res.send({ success: false, message: "Error: Server Error" });
        } else {
          BotList.find({}, (err, data) => {
            let results = [];
            if (err) res.send({ success: false, message: err });
            if (!data) res.send({ success: false, message: "no data" });
            data.forEach((e) => {
              const name = e.botName;
              const image = e.botLogo.toString("base64");
              const points = e.points;
              const _id = e._id;
              const diff = e.diff;

              results.push({ name, image, points, _id, diff });
            });
            res.send({
              success: true,
              results,
            });
          });
        }
      });
    }
  });

  app.delete("/botlist/remove", (req, res, next) => {
    const { body } = req;
    let { id } = body;

    if (!id) res.send({ success: false, message: "No bot selected" });

    BotList.findByIdAndRemove(
      {
        _id: id,
      },
      (err, deleted) => {
        if (err) {
          res.send({
            success: false,
            message: "Error: Server error",
          });
        } else {
          let results = [];
          BotList.find({}, (err, data) => {
            data.forEach((e) => {
              const name = e.botName;
              const image = e.botLogo.toString("base64");
              const points = e.points;
              const _id = e._id;
              const diff = e.diff;

              results.push({ name, image, points, _id, diff });
            });

            if (results.length > 0) {
              res.send({
                success: true,
                results,
              });
            } else {
              res.send({
                success: true,
                message: "List is Empty",
                results,
              });
            }
          });
        }
      }
    );
  });

  app.patch("/botlist/update/name", (req, res, next) => {
    const { body } = req;
    const { value, _id } = body;
    console.log(body);

    if (!value) {
      res.send({ success: false, message: "No name included" });
    } else {
      BotList.findOneAndUpdate(
        {
          _id,
        },
        { botName: value }
      ).then((result, err) => {
        if (err) res.send(err);
        let results = [];
        BotList.find({}, (err, data) => {
          if (!data) res.send({ success: true, message: "no data" });
          data.forEach((e) => {
            const name = e.botName;
            const image = e.botLogo.toString("base64");
            const points = e.points;
            const _id = e._id;
            const diff = e.diff;

            results.push({ name, image, points, _id, diff });
          });
          res.send({
            results,
            success: true,
            message: "Updated Points",
          });
        });
      });
    }
  });

  app.patch("/botlist/update/points", (req, res, next) => {
    const { body } = req;
    const { value, _id } = body;

    BotList.find({ _id }, (err, data) => {
      const prevVal = data[0].points;
      let diff = prevVal - value;

      if (!value) {
        res.send({ success: false, message: "No points included" });
      } else {
        newPoints = parseInt(value, 10);
        BotList.findOneAndUpdate(
          {
            _id,
          },
          { points: newPoints, diff }
        ).then((result, err) => {
          if (err) res.send(err);
          let results = [];
          BotList.find({}, (err, data) => {
            if (!data) res.send({ success: true, message: "no data" });
            data.forEach((e) => {
              const name = e.botName;
              const image = e.botLogo.toString("base64");
              const points = e.points;
              const _id = e._id;
              const diff = e.diff;

              results.push({ name, image, points, _id, diff });
            });
            res.send({
              results,
              success: true,
              message: "Updated Points",
            });
          });
        });
      }
    });
  });
};
