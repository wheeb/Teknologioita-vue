<template>
  <div>
    <div id="formFrame">
      <form @submit.prevent="addMessage">
        <div v-if="error" class="alert ">
          <button data-dismiss="alert">&times;</button>
          <h4>error</h4>
          <p class="mb-0">{{error}}</p>
        </div>
        <div class="form-group" >
          <label for="username">Username</label>
          <input v-model="message.username"
                 type="text"
                 class="form-control"
                 id="username" >
          <div class="form-group">
            <label for="message">message</label>
            <textarea
              v-model="message.message"
              class="form-control"
              id="message"
              rows="2" required></textarea>
          </div>
          <div class="form-group">
            <label for="imageURL">image url</label>
            <input
              v-model="message.imageURL"
              type="url"
              class="form-control"
              id="imageURL"
              placeholder="enter url">
          </div>
          <button type="submit" class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
    <div id="innerframe">
      <hr>
      <div class="list-group" id="spacer10" v-for="message in messages" :key="message._id" >
        <li class="list-group-item">
          <div class="float-left" v-if="message.username">
            <p>
              {{message.username}}
            </p>
          </div>
          <div>
            <small class="float-right">{{message.created}}</small>
          </div>
          <div>
            <h3>
              {{message.subject}}
            </h3>
            <br>
            <p>
              {{message.message}}
            </p>
            <img class="float-left" v-if="message.imageURL"
                 :src="message.imageURL" :alt="message.subject" >
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  const API_URL = 'http://localhost:4000/messages';

  export default {
    name: 'home',
    data: () => ({
      error: '',
      messages: [],
      message: {
        username: '',
        message: '',
        imageURL: '',
      },
    }),
    mounted() {
      fetch(API_URL)
        .then(response => response.json())
        .then((result) => {
          this.messages = result;
        });
    },
    methods: {
      addMessage() {
        fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(this.message),
          headers: {
            'content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then((result) => {
            if (result.details) {
              // there was an error...
              const error = result.details
                .map(detail => detail.message)
                .join('. ');
              this.error = error;
            } else {
              this.error = '';
              this.messages.push(result);
            }
          });
      },
    },
  };

</script>

<style>
  img {
    max-width: 300px;
    max-height: 300px;
  }
  #innerframe {
    margin-left: 2%;
    margin-right: 2%;
  }
  #spacer10 {
    margin-bottom: 10px;
  }
  #formFrame{
    max-width: 80%;
    margin-left: 20px;

  }

</style>
