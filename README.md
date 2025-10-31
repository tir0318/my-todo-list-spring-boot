# Spring Boot & JavaScript TODO List

Spring Boot (Java) とモダンなJavaScript(Vanilla JS)で作る、フルスタックなTODOリストアプリケーションです。
バックエンドAPIとフロントエンドを連携させる学習目的で作成しました。

![ここにスクリーンショットやGIF画像を挿入すると、より分かりやすくなります](https://via.placeholder.com/600x400.png?text=TODO+App+Screenshot)

---

## ✨ 主な機能 (Features)

- ✅ **タスクの追加**: 新しいタスクをリストに追加します。
- 📝 **タスクの編集**: テキストをクリックして内容を更新し、Enterキーで保存します。
- ✔️ **タスクの完了/未完了**: チェックボックスでタスクの状態を切り替えられます。
- 🗑️ **タスクの削除**: 不要になったタスクを削除します。
- 💾 **データ永続化**: 作成したタスクはH2データベースに保存され、アプリケーションを再起動しても保持されます。

---

## 🛠️ 使用技術 (Tech Stack)

このプロジェクトで使用している主な技術です。

| カテゴリ      | 技術                                       |
| :------------ | :----------------------------------------- |
| **バックエンド**  | Java (JDK 25), Spring Boot, Spring Data JPA, Lombok |
| **フロントエンド** | HTML5, CSS3, JavaScript (ES6+, async/await) |
| **データベース**  | H2 In-Memory Database                      |

---

## 🚀 実行方法 (Getting Started)

このプロジェクトをローカル環境で動かす手順です。

### 必要なもの (Prerequisites)

- Java Development Kit (JDK 25 or later) ※
- Apache Maven

※ `pom.xml`のJavaバージョンと合わせてください。

### セットアップ手順 (Installation)

1.  **リポジトリをクローン**
    ```sh
    git clone [リポジトリのURL]
    cd [プロジェクト名]
    ```

2.  **Spring Bootアプリケーションの起動**
    - **IDEを使う場合 (推奨):**
        1.  IntelliJ IDEAなどのIDEでプロジェクトを開きます。
        2.  Mavenの依存関係が自動的にダウンロードされるのを待ちます。
        3.  `src/main/java/com/example/todo/TodoListApplication.java` を開き、`main`メソッドを実行します。
    - **コマンドラインを使う場合:**
        ```sh
        mvn spring-boot:run
        ```

3.  **アプリケーションにアクセス**
    - サーバーが起動したら、ブラウザで以下のURLにアクセスしてください。
    - 👉 **http://localhost:8080**

---

## 🗃️ H2データベースの確認

本アプリケーションは、起動時にメモリ上で動作するH2データベースを使用しています。
開発中にデータベースの状態を確認したい場合は、以下の管理画面にアクセスできます。

- **H2コンソールURL:** http://localhost:8080/h2-console

以下の情報でログインしてください。

| 設定項目      | 値                      |
| :------------ | :---------------------- |
| **JDBC URL**  | `jdbc:h2:mem:testdb`    |
| **ユーザー名**  | `sa`                    |
| **パスワード**  | (空欄のまま)            |
