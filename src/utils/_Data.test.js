import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion function", () => {
  it("fails when textOne is missing", async () => {
    async function save() {
      await _saveQuestion({
        optionTwoText: "optionTwo",
        author: "author",
      });
    }
    await expect(() => save()).rejects;
  });

  it("pass when all textOne, textTwo and author is filled", async () => {
    async function save() {
      await _saveQuestion({
        optionOneText: "optionOne",
        optionTwoText: "optionTwo",
        author: "author",
      });
    }
    await expect(() => save()).resolves;
  });
});

describe("_saveQuestionAnswer function", () => {
  it("fails when answer is missing", async () => {
    async function saveAnswer() {
      await _saveQuestionAnswer({
        qid: "8xf0y6ziyjabvozdd253nd",
        authedUser: "sarahedo",
      });
    }
    await expect(() => saveAnswer()).rejects;
  });

  it("passes when all attributes are given", async () => {
    async function saveAnswer() {
      await _saveQuestionAnswer({
        qid: "8xf0y6ziyjabvozdd253nd",
        authedUser: "sarahedo",
        answer: "xxxx",
      });
    }
    await expect(() => saveAnswer()).resolves;
  });
});
