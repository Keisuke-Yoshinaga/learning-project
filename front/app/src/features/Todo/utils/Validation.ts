export default class Validation {
  // 必須チェック
  requiredValidation = (): boolean => {
    if (!inputTask.value) {
      if (!inputTask.value.trim()) {
        // 入力が空orスペースのみの場合はエラーメッセージを表示
        errorMessage.value = "入力してください。";
        return false;
      }
    } else {
      errorMessage.value = "";
      return true;
    }
    return true;
  };
}
