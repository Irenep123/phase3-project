const API_BASE = "http://localhost:8000";

export const fetchQuizzes = async () => {
  try {
    const res = await fetch(`${API_BASE}/quizzes`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

export const fetchQuiz = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/quizzes/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching quiz ${id}:`, error);
    throw error;
  }
};

export const createQuiz = async (quiz) => {
  try {
    console.log("API: Sending quiz data:", quiz);

    const res = await fetch(`${API_BASE}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    });

    console.log("API: Response status:", res.status);
    console.log(
      "API: Response headers:",
      Object.fromEntries(res.headers.entries())
    );

    const responseText = await res.text();
    console.log("API: Response body:", responseText);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${responseText}`);
    }

    // Try to parse as JSON, fallback to text if it fails
    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      console.warn("API: Response is not valid JSON, returning as text");
      return { message: responseText };
    }
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

export const fetchQuizOptions = async (quizId) => {
  try {
    const res = await fetch(`${API_BASE}/quizzes/${quizId}/options`);
    if (!res.ok) {
      // If specific endpoint doesn't exist, try fetching all options and filter
      const allOptionsRes = await fetch(`${API_BASE}/options`);
      if (allOptionsRes.ok) {
        const allOptions = await allOptionsRes.json();
        return allOptions.filter((option) => option.quiz === quizId);
      }
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching options for quiz ${quizId}:`, error);
    throw error;
  }
};

export const createOption = async (option) => {
  try {
    console.log("API: Sending option data:", option);

    const res = await fetch(`${API_BASE}/options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(option),
    });

    console.log("API: Option response status:", res.status);

    const responseText = await res.text();
    console.log("API: Option response body:", responseText);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${responseText}`);
    }

    try {
      return JSON.parse(responseText);
    } catch (parseError) {
      return { message: responseText };
    }
  } catch (error) {
    console.error("Error creating option:", error);
    throw error;
  }
};

// Test API connectivity
export const testConnection = async () => {
  try {
    const res = await fetch(`${API_BASE}/`);
    return {
      success: true,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
