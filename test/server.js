const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {

  // test for data collection from api
  it("Checks if server can get info from API", (done) => {
    const vars = {
      cocktail: 'margarita'
    };
    chai
    .request(server)
    .post("/get_feed")
    .send(vars)
    .end((err,res) => {
      expect(res.body).to.have.property(item);
      done();
    });
  });

  // test for review uploading
  it("Checks if server can upload reviews to database", (done) => {
    const vars = {
      review: 'I like it!',
      cocktail: 'margarita'
    };
    chai
    .request(server)
    .post("/post_review")
    .send(vars)
    .end((err,res) => {
      expect(res.body.error).to.be.false;
      done();
    });
  });

});
