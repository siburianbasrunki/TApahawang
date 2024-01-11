import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

interface BoVillas {
  villaId: string;
  tanggalCheckin: string;
  tanggalCheckout: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  ticketContainer: {
    border: 1,
    borderColor: '#000000',
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
});

const formatDate = (dateString : string) => {
  const options: Intl.DateTimeFormatOptions =  { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const PdfTiketFile: React.FC<{ bookingData: BoVillas }> = ({ bookingData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.ticketContainer}>
          <Text style={styles.title}>Tiket Villa (tunjukan pada penjaga villa)</Text>
          <View>
            <Text style={styles.label}>ID Villa:</Text>
            <Text style={styles.value}>{(bookingData.villaId || '').slice(0,8)}</Text>

            <Text style={styles.label}>Check-in:</Text>
            <Text style={styles.value}>{formatDate(bookingData.tanggalCheckin)}</Text>

            <Text style={styles.label}>Check-out:</Text>
            <Text style={styles.value}>{formatDate(bookingData.tanggalCheckout)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfTiketFile;
