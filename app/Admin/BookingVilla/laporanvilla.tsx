import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

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

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const LaporanVilla = ({ bookingData }) => {
  if (!bookingData || bookingData.length === 0) {
    return <Text>Data booking tidak tersedia</Text>;
  }

  const totalPendapatan = bookingData.reduce((acc, booking) => {
    const totalBayar = parseFloat(booking.totalbayar.replace(/[^0-9.-]+/g, "").replace(",", ""));
    if (!isNaN(totalBayar)) {
      acc += totalBayar;
    } else {
      console.error(`Invalid totalbayar value for booking ID ${booking.id}`);
    }
    return acc;
  }, 0);

  return (
    <Document>
      <Page size="A1" style={styles.page}>
        <Text style={styles.title}>
          Tabel Laporan Booking Villa Pulau Pahawang
        </Text>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.headerCell]}>
            <Text style={[styles.tableCell]}>Villa ID</Text>
            <Text style={[styles.tableCell]}>Id Pemesan</Text>
            <Text style={[styles.tableCell]}>Check In</Text>
            <Text style={[styles.tableCell]}>Check Out</Text>
            <Text style={[styles.tableCell]}>Bukti Pembayaran</Text>
            <Text style={[styles.tableCell]}>Total Pembayaran</Text>
          </View>

          {bookingData.map((booking, index) => (
            <View key={index} style={styles.tableRow}>
              {/* Limit Villa ID and Id Pemesan to 8 digits */}
              <Text style={styles.tableCell}>{(booking.villaId || '').slice(0, 8)}</Text>
              <Text style={[styles.tableCell, styles.longTextCell]}>
                {(booking.userId || '').slice(0, 8)}
              </Text>
              <Text style={styles.tableCell}>
                {formatDate(booking.tanggalCheckin)}
              </Text>
              <Text style={styles.tableCell}>
                {formatDate(booking.tanggalCheckout)}
              </Text>
              <View style={styles.imageCell}>
                <Image style={styles.image} src={booking.bukti} />
              </View>
              <Text style={styles.tableCell}>{booking.totalbayar}</Text>
            </View>
          ))}
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.headerCell]} colSpan={5}>
            Total Pendapatan
          </Text>
          <Text style={[styles.tableCell, styles.headerCell]}>
            {totalPendapatan.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default LaporanVilla;