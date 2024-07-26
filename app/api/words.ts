import { BACKEND_BASE_URL } from '../lib/constants';
import type {
  Answer,
  AnswerRequest,
  createWordRequest,
  DeleteWordResponse,
  GetTasksResponse,
  GetWordsResponse,
  updateWordRequest,
  Word,
  WordsSearchParams,
} from '../lib/definitions';

const POSTHeaders: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export async function getCategories(access_token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/categories`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const categories: string[] = await response.json();
    return categories;
  } else {
    throw new Error('Unable to fetch categories.');
  }
}

export async function getStatistics(access_token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/statistics`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const statistics: { totalCount: number } = await response.json();
    return statistics.totalCount;
  } else {
    throw new Error('Unable to fetch user statistics.');
  }
}

export async function getAllWords(
  searchParams: Partial<WordsSearchParams>,
  access_token: string
) {
  const searchQuery = new URLSearchParams(searchParams).toString();

  const response = await fetch(`${BACKEND_BASE_URL}/words/all?${searchQuery}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: GetWordsResponse = await response.json();
    return data;
  } else {
    throw new Error('Unable to fetch words data.');
  }
}

export async function getOwnWords(
  searchParams: Partial<WordsSearchParams>,
  access_token: string
) {
  const searchQuery = new URLSearchParams(searchParams).toString();

  const response = await fetch(`${BACKEND_BASE_URL}/words/own?${searchQuery}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: GetWordsResponse = await response.json();
    return data;
  } else {
    throw new Error('Unable to fetch words data.');
  }
}

export async function createWord(
  createWordDto: createWordRequest,
  access_token: string
) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/create`, {
    body: JSON.stringify(createWordDto),
    method: 'POST',
    headers: { ...POSTHeaders, Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: Word = await response.json();
    return data;
  }

  if (response.status === 409) {
    throw new Error('The word already exists in your list.');
  }

  throw new Error('Unable to complete the operation. Please try later.');
}

export async function addWord(word_id: string, access_token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/add/${word_id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: Word = await response.json();
    return data;
  }
  if (response.status === 409) {
    throw new Error('The word is already in your list.');
  }
  throw new Error('Unable to complete the operation. Please try later.');
}

export async function updateWord(
  updateWordDto: updateWordRequest,
  word_id: string,
  access_token: string
) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/edit/${word_id}`, {
    body: JSON.stringify(updateWordDto),
    method: 'PATCH',
    headers: { ...POSTHeaders, Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: Word = await response.json();
    return data;
  } else {
    throw new Error('Unable to complete the operation. Please try later.');
  }
}

export async function deleteWord(word_id: string, access_token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/delete/${word_id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: DeleteWordResponse = await response.json();
    return data;
  } else {
    throw new Error('Unable to complete the operation. Please try later.');
  }
}

export async function getWordsTasks(access_token: string) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/tasks`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: GetTasksResponse = await response.json();
    return data.tasks;
  } else {
    throw new Error('Unable to fetch words tasks data.');
  }
}

export async function postAnswers(
  answerDto: AnswerRequest,
  access_token: string
) {
  const response = await fetch(`${BACKEND_BASE_URL}/words/answers`, {
    body: JSON.stringify(answerDto),
    method: 'POST',
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.ok) {
    const data: Answer[] = await response.json();
    return data;
  } else {
    throw new Error('Unable to complete the operation. Please try later.');
  }
}
