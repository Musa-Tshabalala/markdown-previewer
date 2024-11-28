import './App.css';
import React from 'react';
import { marked } from 'marked';
import image from './image';

const Previewer = (props) => {
  return (
    <div id="container">
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: props.preview }}
      ></div>
    </div>
  );
};

const defaultMarkdown = `
# Let's play a game of Chess shall we?

## My Chess.com link:

[![Chess](${image})](https://www.chess.com/member/realstiff)

---

code for you to keep in heart, \`const Musa = "Winner";\`

### Code Example:
\`\`\`javascript
const myFunction = () => {
  console.log(Musa);
};
\`\`\`

> The above code shows without a doubt that I am the best developer to ever exist *haha!*

**Here is a list of things I can beat you in:**

- Chess
- Code
- More Code
- Boxing
- A lot more
`;

const Header = (props) => {
  return (
    <div id="head-background">
      <h2 id="head">{props.head}</h2>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markup: defaultMarkdown,
      editor: 'Code Editor',
      preview: 'Previewer'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const input = event.target.value;
    const parsedHtml = marked(input, { gfm: true, breaks: true });

    this.setState({
      markup: input,
      previewHtml: parsedHtml
    });
  }

  componentDidMount() {
    this.setState({ previewHtml: marked(this.state.markup, { gfm: true, breaks: true }) });
  }

  render() {
    return (
      <div className="App">
        <Header head={this.state.editor} />
        <textarea
          id="editor"
          value={this.state.markup}
          onChange={this.handleChange}
        ></textarea>
        <Header head={this.state.preview} />
        <Previewer preview={this.state.previewHtml} />
      </div>
    );
  }
}

export default App;