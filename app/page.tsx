'use client';

import { FormEvent, useEffect, useState } from "react";

const initialState = {
  question: '',
  answer: '',
  loading: false,
};

export default function Home() {

  const [state, setState] = useState(initialState);

  const { question, answer, loading } = state;

  async function onQuestionSubmission(submittedQuestion: string) {
    setState(state => ({
      ...state,
      loading: true,
      question: submittedQuestion,
    }));
    const resp = await fetch(`/api/ai?${new URLSearchParams({
      question: submittedQuestion,
    })}`);
    const { response } = await resp.json();
    setState(state => ({
      ...state,
      answer: response,
      loading: false
    }));
  }

  return (
    <main>
      <h1>NEXT-ON-PAGES WORKERS-AI TEST</h1>
      {
        loading
        ? <Loading />
        : <>
          { answer
            ? <ResultSection question={question} answer={answer} onReset={() => setState(initialState)} />
            : <QuestionForm onSubmit={onQuestionSubmission}/>
          }
        </>
      }
    </main>
  )
}

function QuestionForm({ onSubmit } : { onSubmit: (question: string) => void }) {
  const [question, setQuestion] = useState('');
  // Note: it would be great to use serverAction here! but they currently don't work locally with next-on-pages
  //       (https://github.com/cloudflare/next-on-pages/issues/588)
  //       so let's do things in the old way
  return <form onSubmit={async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData.get('question') as string);
  }}>
      <label htmlFor="question">Question:</label>
      <textarea id="question" name='question' required rows={5} value={question} onChange={event => setQuestion(event.target.value)} />
      <button>Ask</button>
  </form>;
}

function Loading() {
  const [nDots, setNDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNDots(dots => (dots + 1) % 10);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const dots = new Array(nDots).fill('.').join('');
  return <h2>Thinking{dots}</h2>
}

function ResultSection({ question, answer, onReset } : { question: string, answer: string, onReset: () => void }) {
  return <section>
    <h2>Question</h2>
    <p>{question}</p>
    <h2>answer</h2>
    <p>{answer}</p>
    <button onClick={onReset}>Ask a new question</button>
  </section>;
}