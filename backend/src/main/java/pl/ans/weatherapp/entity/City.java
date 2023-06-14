package pl.ans.weatherapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString
@Table(name = "city")

public class City {
    @Id
    @Column(name = "id_archive", length = 9)
    private String idArchive;

    @Column(name = "city", length = 30)
    private String city;

    @Column(name = "id_current", length = 6)
    private String idCurrent;
}