import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

interface DonasiData {
  id: number;
  user: {
    name: string;
  } | null;
  terumbuKarangId: number;
  jumlahDonasi: number;
  buktiPembayaran: string;
  nomortelepon: string;
  terumbuKarang: {
    nama: string;
  };
  tanggalDonasi: string;
  userId: string;
  gambar: string;
}

interface LaporanDonasiProps {
  donasiData: DonasiData[];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  tableCell: {
    margin: "auto",
    padding: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e0e0e0",
    textAlign: "center",
    flex: 1,
    width: 150,
  },
  headerCell: {
    backgroundColor: "#4CAF50",
    color: "#ffffff",
    fontWeight: "bold",
  },
  imageCell: {
    padding: 2,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "auto",
    maxWidth: 100,
    maxHeight: 100,
  },
  longTextCell: {
    width: 250,
  },
});

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const LaporanDonasi: React.FC<LaporanDonasiProps> = ({ donasiData }) => {
  if (!donasiData || donasiData.length === 0) {
    return <Text>Data donasi tidak tersedia</Text>;
  }

  const totalDonasi = donasiData.reduce((acc, donasi) => {
    acc += donasi.jumlahDonasi;
    return acc;
  }, 0);

  return (
    <Document>
      <Page size="A1" style={styles.page}>
        <Text style={styles.title}>Tabel Laporan Donasi</Text>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.headerCell]}>
            <Text style={[styles.tableCell]}>ID</Text>
            <Text style={[styles.tableCell]}>Nama Donatur</Text>
            <Text style={[styles.tableCell]}>Jumlah Donasi</Text>
            <Text style={[styles.tableCell]}>Bukti Pembayaran</Text>
            <Text style={[styles.tableCell]}>Nomor WhatsApp</Text>
            <Text style={[styles.tableCell]}>Terumbu Karang</Text>
            <Text style={[styles.tableCell]}>Tanggal Donasi</Text>
          </View>

          {donasiData.map((donasi, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{donasi.id}</Text>
              <Text style={[styles.tableCell, styles.longTextCell]}>
                {donasi.user?.name || "Unknown User"}
              </Text>
              <Text style={styles.tableCell}>Rp. {donasi.jumlahDonasi}</Text>
              <View style={styles.imageCell}>
                <Image style={styles.image} src={donasi.buktiPembayaran} />
                <Text style={{ fontSize: 10, textAlign: "center" }}>
                  Bukti Pembayaran
                </Text>
              </View>
              <Text style={styles.tableCell}>{donasi.nomortelepon}</Text>
              <View style={styles.imageCell}>
                <Image style={styles.image} src={donasi.gambar} />
                <Text style={{ fontSize: 10, textAlign: "center" }}>
                  Gambar Terumbu Karang
                </Text>
              </View>
              <Text style={styles.tableCell}>
                {formatDate(donasi.tanggalDonasi)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.headerCell, { flex: 5 }]}>
            <Text>Total Donasi</Text>
          </View>
          <View style={[styles.tableCell, styles.headerCell, { flex: 1 }]}>
            <Text>Rp. {totalDonasi}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default LaporanDonasi;
