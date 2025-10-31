Spring Boot & JavaScript TODOリスト

Spring Boot (Java) をバックエンドAPIサーバーとして、HTML/CSS/JavaScriptをフロントエンドとして使用した、シンプルなToDoリストアプリケーションです。
Spring Bootとフロントエンドを連携させる学習のために作成しました。

主な機能

このToDoリストでできることです。

タスクの追加: 新しいタスクを入力して追加できます。

タスクの一覧表示: ページ読み込み時にすべてのタスクを表示します。

タスクの完了: チェックボックスをクリックして、タスクを完了状態（取り消し線）にできます。

タスクの削除: × ボタンでタスクを削除できます。

タスクの編集: タスクのテキストをクリックすると編集モードになり、Enterキーで内容を保存できます。

データ永続化: タスクはH2データベースに保存されます。

使用技術

このプロジェクトで使用している主な技術です。

バックエンド (サーバー側)

Java (JDK 25)

Spring Boot

Spring Data JPA

Lombok

フロントエンド (ブラウザ側)

HTML5

CSS3 (モダンなデザイン)

JavaScript (ES6+, async/await, fetch API)

データベース

H2 In-Memory Database (インメモリデータベース)

実行方法

このプロジェクトをあなたのPCで動かす方法です。

必要なもの

Java (JDK 25)

Maven

手順

このリポジトリをローカルにクローン（ダウンロード）します。

IntelliJ IDEAなどのIDEでプロジェクトを開きます。

Mavenの依存関係が自動的にダウンロードされるのを待ちます。

src/main/java/com/example/todo/TodoListApplication.java ファイルを開き、main メソッドを実行してSpring Bootアプリケーションを起動します。

ブラウザで http://localhost:8080 にアクセスすると、ToDoリストの画面が表示されます。

データベースの確認

このアプリケーションは、起動するたびにデータがリセットされる「インメモリデータベース」を使用しています。
application.properties の設定により、http://localhost:8080/h2-console からデータベースの管理画面にアクセスできます。

JDBC URL: jdbc:h2:mem:testdb

ユーザー名: sa

パスワード: (なし)
