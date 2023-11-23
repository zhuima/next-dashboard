// MyDocument.js
import React from "react";
import {
  Page as InitPage,
  Text,
  View,
  Font,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// 导入字体
Font.register({
  family: "Microsoft Yahei",
  src: "/font/msyh.ttf",
});

// 定义样式
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    margin: 12,
    fontSize: 54,
    textAlign: "justify",
    fontFamily: "Microsoft Yahei",
  },
  content: {
    margin: 20,
    fontSize: 24,
    textAlign: "justify",
    fontFamily: "Microsoft Yahei",
  },
});

// Header 组件
const Header = () => (
  <Text
    style={{
      position: "absolute",
      top: 30,
      left: 30,
      right: 30,
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
    }}
  >
    追马 CMDB 值班表
  </Text>
);

// Footer 组件
const Footer = ({ pageNumber, totalPages }) => (
  <View
    fixed
    style={{
      position: "absolute",
      bottom: 30,
      left: 30,
      right: 30,
      fontSize: 24,
      fontFamily: "Microsoft Yahei",
    }}
  >
    <Text>
      本PDF文档由程序自动生成 Page {pageNumber} of {totalPages}
    </Text>
  </View>
);

// MyDocument 组件
const ExportDocument = ({ dutys }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <InitPage size="A4" style={styles.body}>
        <View style={styles.text}>
          <Text>运维排班系统详情</Text>
          <Text style={styles.content}>{currentDate}</Text>
        </View>
      </InitPage>

      {dutys.map((item, index) => (
        <InitPage key={index} style={styles.body}>
          <Header />
          <View>
            <Text style={styles.content}>
              {item.id} {item.title}
            </Text>
          </View>
          <Footer pageNumber={index + 1} totalPages={dutys.length} />
        </InitPage>
      ))}
    </Document>
  );
};

export default ExportDocument;
