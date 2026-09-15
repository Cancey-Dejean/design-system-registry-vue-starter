export default defineEventHandler(async (event) => {
  return getLlmsTextResponse(event);
});
