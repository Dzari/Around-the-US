export default class Api {
  constructor({ baseUrl, headers }) {
    (this._baseUrl = baseUrl), (this._headers = headers);
  }

  async validateAndParse(res) {
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject();
    }
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
      return this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }

  async getUserInfo() {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
      return this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }

  async patchProfileInfo(name, about) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      });
      this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }

  async addNewCard({ name, link }) {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      });
      this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCard(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }

  async likeCard(cardId, method) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: method,
        headers: this._headers,
      });
      this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }

  async removeLike(cardId, method) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: method,
        headers: this._headers,
      });
      this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }

  async changeProfilePicture(link) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: link,
        }),
      });
      this.validateAndParse(res);
    } catch (err) {
      console.log(err);
    }
  }
}
