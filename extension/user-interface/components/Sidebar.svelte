<script lang="ts">
  import { onMount } from "svelte";

  let todos: Array<{ text: String; completed: boolean }> = [];
  let text = "";
  onMount(() => {
    window.addEventListener("message", event => {
      const message = event.data; // The json data that the extension sent
      console.log(message);

      switch (message.type) {
        case "new-todo":
          todos = [{ text: message.value, completed: false }, ...todos];
          break;
      }
    });
  });
</script>

<div>
  <form
    on:submit|preventDefault={() => {
      todos = [{ text, completed: false }, ...todos];
      text = "";
    }}
  >
    <input type="text" bind:value={text} />
  </form>
</div>

<ul>
  {#each todos as todo (todo.text)}
    <li
      class:complete={todo.completed}
      on:click={() => {
        todo.completed = !todo.completed;
      }}
    >
      {todo.text}
    </li>
  {/each}
</ul>

<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onInfo",
      value: "Test Info Message",
    });
  }}
>
  Click for Info Message
</button>

<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onError",
      value: "Test Error Message",
    });
  }}
>
  Click for Error Message
</button>

<style>
  div {
    color: palevioletred;
  }
  .complete {
    text-decoration: line-through;
  }
</style>
