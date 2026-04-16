const API_ENDPOINT = import.meta.env.VITE_APPSYNC_URL;
const API_KEY = import.meta.env.VITE_APPSYNC_API_KEY;

// ✅ global tenantId
const TENANT_ID = import.meta.env.VITE_TENANT_ID || "biet-college";

export const graphqlRequest = async (query, variables = {}) => {
  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        query,
        variables: {
          tenantId: TENANT_ID, // 🔥 automatically added
          ...variables,        // allow override if needed
        },
      }),
    });

    const data = await res.json();

    if (data.errors) {
      console.error("[GraphQL ERROR]", data.errors);
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (err) {
    console.error("[GraphQL REQUEST FAILED]", err);
    throw err;
  }
};