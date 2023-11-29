import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MAIN_COLORS } from "../globlaStyle/colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1024px;
  align-items: center;
  margin: 64px auto;
  padding: 0 48px;
`;
const TableContainer = styled.div`
  margin-top: 48px;

  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const TableHeader = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f0f0f0;
  font-weight: bold;
`;

const TableHeaderCell = styled.div`
  flex: 1;
  text-align: center;
`;

const TableRow = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  align-items: center;
`;

const TableCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 0px 15px;
`;
const FacilityDetailButton = styled.button`
  margin: 5px 0;
  padding: 10px;
  background-color: ${MAIN_COLORS.blue};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

const Message = styled.p`
  color: red;
  display: flex;
  justify-content: center;
`;

const TableCellDescription = styled.div`
  flex: 2;
  text-align: center;
  padding: 0 30px;
  overflow: auto;
  max-height: 100px;
`;

const TableHeaderCellDescription = styled.div`
  flex: 2;
  text-align: center;
`;

const DeleteButton = styled.button`
  margin: 5px 0;
  padding: 10px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
  price: string;
  facilityId: string;
  userId: string;
}

interface Facility {
  name: string;
  description: string;
  type: {
    name: string;
  };
}

const Table: React.FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [facilities, setFacilities] = useState<Record<string, Facility>>({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleDeleteReservation = async (reservationId: string) => {
    try {
      const response = await fetch(
        `https://reshal-api.bartoszmagiera.dev/reservations/${reservationId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedReservations = reservations.filter(
          (reservation) => reservation.id !== parseInt(reservationId, 10)
        );
        setReservations(updatedReservations);

        const updatedResponse = await fetch(
          "https://reshal-api.bartoszmagiera.dev/reservations/me",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedData = await updatedResponse.json();
        setReservations(updatedData);
      } else {
        console.error("Error deleting reservation:", response.status);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "https://reshal-api.bartoszmagiera.dev/reservations/me",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setReservations(data);

        for (const reservation of data) {
          if (!facilities[reservation.facilityId]) {
            fetchFacilityInfo(reservation.facilityId);
          }
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    const fetchFacilityInfo = async (facilityId: string) => {
      try {
        const response = await fetch(
          `https://reshal-api.bartoszmagiera.dev/facilities/${facilityId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setFacilities((prevFacilities) => ({
          ...prevFacilities,
          [facilityId]: data,
        }));
      } catch (error) {
        console.error("Error fetching facility information:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <Container>
      <TableContainer>
        <TableHeader>
          <TableHeaderCell>Start Time</TableHeaderCell>
          <TableHeaderCell>End Time</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>Facility Name</TableHeaderCell>
          <TableHeaderCellDescription>
            Facility Description
          </TableHeaderCellDescription>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Facility Detail</TableHeaderCell>
          <TableHeaderCell>Reservation Delete</TableHeaderCell>
        </TableHeader>
        {reservations.length === 0 ? (
          <Message>No reservations yet.</Message>
        ) : (
          reservations.map((reservation: Reservation, index: number) => {
            const facility = facilities[reservation.facilityId];
            const formattedStartTime = formatDate(reservation.startTime);
            const formattedEndTime = formatDate(reservation.endTime);

            const handleReservationClick = () => {
              navigate(`/facility/${reservation.facilityId}`);
            };
            const handleDeleteClick = () => {
              handleDeleteReservation(reservation.id.toString());
            };
            return (
              <TableRow key={index}>
                <TableCell>{formattedStartTime}</TableCell>
                <TableCell>{formattedEndTime}</TableCell>
                <TableCell>{reservation.price}</TableCell>

                {facility && (
                  <>
                    <TableCell>{facility.name}</TableCell>
                    <TableCellDescription>
                      {facility.description}
                    </TableCellDescription>
                    <TableCell>{facility.type.name}</TableCell>
                  </>
                )}
                <TableCell>
                  {" "}
                  <FacilityDetailButton onClick={handleReservationClick}>
                    Details
                  </FacilityDetailButton>
                </TableCell>
                <TableCell>
                  <DeleteButton onClick={handleDeleteClick}>
                    Delete
                  </DeleteButton>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableContainer>
    </Container>
  );
};

export default Table;
