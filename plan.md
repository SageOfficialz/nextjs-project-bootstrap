```markdown
# Detailed Implementation Plan for Tool Tracking Device Application

This plan outlines the changes and new files required to add a command prompt interface with built‐in QR code scanning and AI support (“Sage”) powered by Google Gemini. The solution will integrate with our existing Next.js application and adhere to best practices, including error handling and modern UI/UX considerations.

---

## 1. Dependency Management

- **Update package.json:**  
  - Add the dependency for the QR scanner library (e.g., "react-qr-reader").  
  - Run:  
    ```bash
    npm install react-qr-reader
    ```
  - Ensure any new dependency versions are compatible with Next.js and TypeScript.

---

## 2. Create a New Page for the Application

**File:** `src/app/tool-tracker/page.tsx`  
**Changes & Steps:**
- Create a new Next.js page that serves as the main interface of the "Tool Tracking Device".
- Import the following components:
  - `CommandPrompt` (for handling user input commands)
  - `QRScanner` (for scanning QR codes)
  - `ToolList` (to display and manage tracked tools)
- Build a modern, responsive UI with a dark background, monospace fonts for the command prompt, and clear typography.
- Include a header with the title "Tool Tracking Device" and brief instructions on the available commands (e.g. “scan”, “sage [query]”, “track”) that guide the user.

---

## 3. Implement Command Prompt Component

**File:** `src/components/CommandPrompt.tsx`  
**Changes & Steps:**
- Create a React component with:
  - An output area displaying command history and responses.
  - A text input field styled as a terminal prompt.
  - A “Send” button (or use Enter key) to capture commands.
- Parse commands:
  - When the command is `scan`, toggle the visibility of the QR scanner.
  - When the command begins with `sage`, extract the query text and trigger the AI API call.
  - When the command is `track`, show the current tool list.
- Use React state (e.g., `useState`) for managing command history and UI toggles.
- Implement graceful error handling if an invalid command is entered.

---

## 4. Build the QRScanner Component

**File:** `src/components/QRScanner.tsx`  
**Changes & Steps:**
- Use the `react-qr-reader` component to access the user’s webcam.
- Provide an `onScan` callback that:
  - Returns the scanned QR code data.
  - Adds the scanned result to the Tool List (see ToolList component).
- Handle errors via an `onError` callback to display user-friendly error messages if camera access is denied or scanning fails.
- Ensure the UI provides a fallback message if the scanner fails.

---

## 5. Build the ToolList Component

**File:** `src/components/ToolList.tsx`  
**Changes & Steps:**
- Create a UI component to display the list of tracked tools.
- Use a clean, modern list layout with clear typography and spacing.
- Store scanned tools in React state and optionally persist to localStorage for session continuity.
- Provide basic operations (such as add or clear tools) and error messages if the list is empty.

---

## 6. Implement the AI (Sage) API Route

**File:** `src/app/api/sage/route.ts`  
**Changes & Steps:**
- Create an API route that listens for POST requests.
- Validate the request payload to ensure a `query` parameter is provided.
- Use a `try...catch` block to handle API request errors.
- Integrate with Google Gemini using the environment variable `process.env.GOOGLE_GEMINI_API_KEY`. (The integration can be simulated or directed to the official endpoint provided by Gemini documentation.)
- Return a JSON response with the AI-generated response or an error message with an appropriate HTTP status code.
- Include logging for debugging purposes.

---

## 7. Update Global Styles

**File:** `src/app/globals.css`  
**Changes & Steps:**
- Add custom styles for the command prompt interface, such as:
  - A dark background with complementary accent colors.
  - Monospace font for the terminal input.
  - Responsive layouts using flex/grid for the header, command area, QR scanner, and tool list.
- Ensure graceful degradation if any images (if used later) fail to load by using placeholder images formatted as specified.

---

## 8. Integration and Error Handling Best Practices

- **Component-Level Error Handling:**  
  - Each component should validate inputs and wrap asynchronous operations in `try...catch` blocks.
  - Provide user-friendly error messages in the UI when an operation fails (e.g., camera access denied or API call error).

- **API Error Handling:**  
  - Validate incoming requests in `/api/sage/route.ts` and return appropriate HTTP status codes.
  - Log errors server-side for debugging.

- **UI/UX Considerations:**  
  - Ensure the command prompt and QR scanner UI are intuitive, with clear instructions and feedback.
  - Use modern typography, spacing, and color contrast to create a professional appearance.
  - Avoid external images; if needed, use placeholder images formatted per guidelines.

---

## 9. Testing and Validation

- **Manual Testing in the Browser:**  
  - Validate the command prompt interactions, including toggling the QR scanner and processing commands.
  - Scan sample QR codes to ensure results are added to the ToolList.

- **API Testing with cURL:**  
  - Test the `/api/sage` endpoint with a sample POST request:
    ```bash
    curl -X POST http://localhost:3000/api/sage \
      -H "Content-Type: application/json" \
      -d '{"query": "What tools do I have?"}'
    ```
  - Verify the JSON response, HTTP status, and error handling.

---

## Summary

- The implementation creates a dedicated Next.js page with a modern terminal-style UI and components for command input, QR scanning, and tool tracking.  
- Dependencies (e.g., react-qr-reader) are added and managed via package.json.  
- The CommandPrompt component parses commands ("scan", "sage", "track") and triggers appropriate actions.  
- The QRScanner component handles webcam input and error conditions while scanning QR codes.  
- The ToolList component displays a dynamic list of scanned tools, and the API route integrates with Google Gemini for AI responses using the provided API key.  
- Global styles are updated for a clean, responsive design with appropriate error handling and testing protocols in place.
