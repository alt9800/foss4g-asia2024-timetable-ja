# このページは[FOSS4G ASIA 2024](https://foss4g.asia/2024/)のカンファレンススケジュールの日本語翻訳版のリポジトリです。

abstract と description が翻訳されていて、モーダルで表示されています。(元ページのリンクも含みます。)


▪️一覧で見られるページ

https://talks.geoinfo-lab.org/foss4g-asia-2024/schedule/

▪️1列で見られる形

https://talks.geoinfo-lab.org/foss4g-asia-2024/talk




src以下のjsonを使うことで他の言語にも翻訳できるようにしています。

```json
  {
    "title": "Developing a Web-Based Spatial Decision Support System (SDSS) Using Geoserver",
    "date": "2024-12-15",
    "time_range": "14:00-18:00",
    "location": "Room34-1101",
    "abstract": "This hands-on workshop delves into the creation of a web-based Spatial Decision Support System (SDSS) from the ground up, utilizing Geoserver as a key tool. SDSS development involves the integration of conventional and spatially referenced data, decision logic, and a web-based interface for spatial data analysis. The SDSS architecture comprises components such as Web Processing Service (WPS), Web Feature Service (WFS), Web Mapping Service (WMS), Geoserver/Map-server, and Geo-processing.",
    "description": "Use Case and Applications, Education and Training, Data Management and Visualization.\nPLEASE GO THROUGH ATTACHMENT FOR REQUIREMENTS AND DATA.",
    "speaker": "CHANDAN M C",
    "url": "https://talks.geoinfo-lab.org/foss4g-asia-2024/talk/KSDZBB/",
    "abstract_ja": "このハンズオンワークショップでは、Geoserverをキーツールとして、ウェブベースの空間意思決定支援システム（SDSS）を一から作成します。SDSSの開発には、従来のデータと空間参照データ、意思決定ロジック、空間データ分析のためのウェブベースのインターフェースの統合が含まれます。SDSSのアーキテクチャは、ウェブ処理サービス（WPS）、ウェブフィーチャーサービス（WFS）、ウェブマッピングサービス（WMS）、Geoserver/Map-server、Geo-processingなどのコンポーネントで構成されている。",
    "description_ja": "ユースケースとアプリケーション、教育とトレーニング、データ管理と可視化。\n要件とデータについては添付ファイルをご覧ください。"
  },

```


FOSS4G ASIA2024では `pretalx` を用いて動的にタイムテーブルを作成しているので、本来はics形式以外にGeoJSONでデータを取得できるはずですが、許可されていないようです。

curlコマンドにも対応しています。

```bash
# スケジュールがコンソールに表示される
curl https://talks.geoinfo-lab.org/foss4g-asia-2024/schedule/

# タイトルのみが得られる
curl https://talks.geoinfo-lab.org/foss4g-asia-2024/schedule/\?format=list



```

